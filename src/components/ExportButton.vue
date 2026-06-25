<script setup>
// COMP-05 — Export Button (US-11, Design Doc §5.8)
import { ref } from 'vue'
import { Download, ChevronDown, FileText, Table } from 'lucide-vue-next'
import { useTimeRangeStore } from '../stores/timeRange'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const props = defineProps({
  // ID of the DOM element to capture for PDF (defaults to #main-content)
  exportTargetId: { type: String, default: 'pdf-export-target' },
  // Array of row objects for CSV export
  csvData: { type: Array, default: () => [] },
  csvFilename: { type: String, default: 'export' },
})

const timeRangeStore = useTimeRangeStore()
const open = ref(false)
const exporting = ref(false)

function toggleDropdown() {
  open.value = !open.value
}

function closeDropdown() {
  open.value = false
}

// COMP-05-T02: PDF export via html2canvas + jsPDF (US-11 AC-03)
async function exportPdf() {
  closeDropdown()
  exporting.value = true
  try {
    const el = document.getElementById(props.exportTargetId) ?? document.body
    const canvas = await html2canvas(el, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: getComputedStyle(document.documentElement)
        .getPropertyValue('--color-bg').trim() || '#f5f7fa',
    })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`${props.csvFilename}-${timeRangeStore.selected}.pdf`)
  } finally {
    exporting.value = false
  }
}

// COMP-05-T03: CSV export (US-11 AC-04)
function exportCsv() {
  closeDropdown()
  if (!props.csvData.length) return
  const headers = Object.keys(props.csvData[0])
  const rows = props.csvData.map((row) =>
    headers.map((h) => {
      const val = row[h] ?? ''
      // Escape values that contain commas or quotes
      const str = String(val)
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str
    }).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.csvFilename}-${timeRangeStore.selected}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <!-- COMP-05-T01: Outline button with dropdown (Design Doc §5.8) -->
  <div class="export-btn-wrapper" v-click-outside="closeDropdown">
    <button
      class="export-btn"
      :disabled="exporting"
      @click="toggleDropdown"
      aria-haspopup="true"
      :aria-expanded="open"
    >
      <Download :size="16" aria-hidden="true" />
      <span>{{ exporting ? 'Exporting…' : 'Export' }}</span>
      <ChevronDown :size="14" aria-hidden="true" />
    </button>

    <!-- Dropdown menu -->
    <Transition name="dropdown-fade">
      <ul v-if="open" class="export-dropdown" role="menu">
        <li>
          <button class="export-dropdown__item" role="menuitem" @click="exportPdf">
            <FileText :size="14" aria-hidden="true" />
            Export as PDF
          </button>
        </li>
        <li>
          <button class="export-dropdown__item" role="menuitem" @click="exportCsv">
            <Table :size="14" aria-hidden="true" />
            Export as CSV
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<!-- v-click-outside directive registered inline -->
<script>
export default {
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el._clickOutside = (e) => {
          if (!el.contains(e.target)) binding.value()
        }
        document.addEventListener('mousedown', el._clickOutside)
      },
      unmounted(el) {
        document.removeEventListener('mousedown', el._clickOutside)
      },
    },
  },
}
</script>

<style scoped>
.export-btn-wrapper {
  position: relative;
  display: inline-block;
}

/* COMP-05-T05: Outline button style (Design Doc §5.8) */
.export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 120ms ease, color 120ms ease;
}

/* COMP-05-T05: Hover — border + text shift to teal */
.export-btn:hover:not(:disabled) {
  border-color: #0095a9;
  color: #0095a9;
}

.export-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.export-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  width: 180px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(1, 30, 65, 0.12);
  overflow: hidden;
  list-style: none;
  z-index: 100;
}

.export-dropdown__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 120ms ease;
}

.export-dropdown__item:hover {
  background-color: rgba(0, 149, 169, 0.06);
  color: #0095a9;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 100ms ease, transform 100ms ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

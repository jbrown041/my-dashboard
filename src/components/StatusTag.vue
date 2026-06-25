<script setup>
// COMP-03-T06 — Status Tag (Design Doc §5.4)
defineProps({
  status: {
    type: String,
    required: true,
    // 'Delivered' | 'In Transit' | 'Delayed' | 'Exception'
  },
})
</script>

<template>
  <span class="status-tag" :class="`status-tag--${status.toLowerCase().replace(' ', '-')}`">
    {{ status }}
  </span>
</template>

<style scoped>
.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  white-space: nowrap;
}

/* Design Doc §5.4 status tag color map */
.status-tag--delivered {
  background-color: rgba(46, 125, 94, 0.12);
  color: #2e7d5e;
}

.status-tag--in-transit {
  background-color: rgba(0, 149, 169, 0.12);
  color: #0095a9;
}

.status-tag--delayed {
  background-color: rgba(212, 134, 11, 0.12);
  color: #d4860b;
}

.status-tag--exception {
  background-color: rgba(234, 104, 82, 0.12);
  color: #ea6852;
}
</style>

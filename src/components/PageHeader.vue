<script setup>
// SHELL-05-T04 — Reusable PageHeader (Design Doc §4.5)
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <!-- SHELL-05-T04: Page header — title, subtitle, time filter slot, export slot -->
  <div class="page-header">
    <div class="page-header__top">
      <div class="page-header__titles">
        <h1 class="page-header__title">{{ title }}</h1>
        <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
      </div>

      <div class="page-header__actions">
        <!-- Slot for TimeRangeFilter (built in Sprint 2 COMP-01) -->
        <slot name="time-filter" />
        <!-- Slot for ExportButton (built in Sprint 2 COMP-05) -->
        <slot name="export" />
      </div>
    </div>

    <hr class="page-header__divider" />
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 24px;
}

.page-header__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.page-header__titles {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-header__title {
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  color: var(--color-text-primary);
}

.page-header__subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--color-text-secondary);
}

.page-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.page-header__divider {
  border: none;
  border-top: 1px solid var(--color-border);
}
</style>

/**
 * Mock service layer — simulates async API calls.
 * All functions return Promises with a small simulated delay.
 * Swap implementations here when a real API is available; components stay unchanged.
 */

import kpiData from '../data/kpi.json'
import shipmentVolumeData from '../data/shipmentVolume.json'
import shipmentsByStatusData from '../data/shipmentsByStatus.json'
import shipmentsByRegionData from '../data/shipmentsByRegion.json'
import shipmentsData from '../data/shipments.json'
import carriersData from '../data/carriers.json'
import carrierOnTimeRateData from '../data/carrierOnTimeRate.json'
import regionalData from '../data/regional.json'
import exceptionsSummaryData from '../data/exceptionsSummary.json'
import exceptionsData from '../data/exceptions.json'
import notificationsData from '../data/notifications.json'

const SIMULATED_DELAY_MS = 400

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── KPI ────────────────────────────────────────────────────────────────────
export async function fetchKpi(timeRange) {
  await delay()
  return kpiData[timeRange] ?? kpiData['last_30_days']
}

// ─── Shipment Volume ─────────────────────────────────────────────────────────
export async function fetchShipmentVolume(timeRange) {
  await delay()
  return shipmentVolumeData[timeRange] ?? shipmentVolumeData['last_30_days']
}

// ─── Shipments by Status ─────────────────────────────────────────────────────
export async function fetchShipmentsByStatus(timeRange) {
  await delay()
  return shipmentsByStatusData[timeRange] ?? shipmentsByStatusData['last_30_days']
}

// ─── Shipments by Region ──────────────────────────────────────────────────────
export async function fetchShipmentsByRegion(timeRange) {
  await delay()
  return shipmentsByRegionData[timeRange] ?? shipmentsByRegionData['last_30_days']
}

// ─── Shipments Table ─────────────────────────────────────────────────────────
export async function fetchShipments() {
  await delay()
  return shipmentsData
}

// ─── Carriers ─────────────────────────────────────────────────────────────────
export async function fetchCarriers() {
  await delay()
  return carriersData
}

// ─── Carrier On-Time Rate Over Time ──────────────────────────────────────────
export async function fetchCarrierOnTimeRate(timeRange) {
  await delay()
  const key = timeRange === 'today' ? 'last_7_days' : timeRange
  return carrierOnTimeRateData[key] ?? carrierOnTimeRateData['last_30_days']
}

// ─── Regional Performance ─────────────────────────────────────────────────────
export async function fetchRegional() {
  await delay()
  return regionalData
}

// ─── Exceptions Summary ───────────────────────────────────────────────────────
export async function fetchExceptionsSummary(timeRange) {
  await delay()
  return exceptionsSummaryData[timeRange] ?? exceptionsSummaryData['last_30_days']
}

// ─── Exceptions Table ─────────────────────────────────────────────────────────
export async function fetchExceptions() {
  await delay()
  return exceptionsData
}

// ─── Notifications ────────────────────────────────────────────────────────────
export async function fetchNotifications() {
  await delay()
  return notificationsData
}

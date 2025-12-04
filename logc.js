function goToCalculator() {
  document.getElementById("landing-page").classList.add("hidden")
  document.getElementById("calculator-page").classList.remove("hidden")
  window.scrollTo(0, 0)
}

function goToLanding() {
  location.reload()
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Wizard Navigation Logic
let currentStep = 1
const totalSteps = 5

function updateProgress() {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100
  document.getElementById("progressBar").style.width = `${progress}%`

  // Update step indicators
  document.querySelectorAll(".step").forEach((step) => {
    const stepNum = Number.parseInt(step.dataset.step)
    if (stepNum < currentStep) {
      step.classList.add("completed")
      step.classList.remove("active")
      step.innerHTML = "✓"
    } else if (stepNum === currentStep) {
      step.classList.add("active")
      step.classList.remove("completed")
      step.innerHTML = stepNum
    } else {
      step.classList.remove("active", "completed")
      step.innerHTML = stepNum
    }
  })
}

function showStep(step) {
  document.querySelectorAll(".form-step").forEach((s) => {
    s.classList.remove("active")
  })
  document.getElementById(`step${step}`).classList.add("active")
  currentStep = step
  updateProgress()
  window.scrollTo(0, 0)
}

function validateStep(step) {
  const currentStepEl = document.getElementById(`step${step}`)
  const inputs = currentStepEl.querySelectorAll("input, select")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value) {
      isValid = false
      input.style.borderColor = "#ef4444"
    } else {
      input.style.borderColor = "#e2e8f0"
    }
  })

  if (!isValid) {
    alert("Please fill in all fields before proceeding.")
  }

  return isValid
}

function nextStep(step) {
  if (validateStep(step)) {
    if (step < totalSteps) {
      showStep(step + 1)
    }
  }
}

function prevStep(step) {
  if (step > 1) {
    showStep(step - 1)
  }
}

// Calculation Logic
function calculateCost(event) {
  event.preventDefault()

  if (!validateStep(5)) return

  const carYear = document.getElementById("carYear").value
  const carPrice = Number.parseFloat(document.getElementById("carPrice").value) || 0
  const carYrUse = Number.parseInt(document.getElementById("carYrUse").value) || 0
  const carTDmonth = Number.parseInt(document.getElementById("carTDmonth").value) || 0

  const n = carYrUse
  const td_month = carTDmonth
  let td = td_month * 12 * n
  td = td + 1000
  let totalMonthlyCost = 0.0

  const tyreChangeCost = Number.parseFloat(document.getElementById("tyreChangeCost").value) || 0
  const brakePadLinerCost = Number.parseFloat(document.getElementById("brakePadLinerCost").value) || 0
  const transmissionFluidCost = Number.parseFloat(document.getElementById("transmissionFluidCost").value) || 0
  const coolantReplaceCost = Number.parseFloat(document.getElementById("coolantReplaceCost").value) || 0
  const batteryReplacementCost = Number.parseFloat(document.getElementById("batteryReplacementCost").value) || 0

  const ttc = tyreChangeCost * Number.parseInt(td / 30000.0)
  const tbc = brakePadLinerCost * Number.parseInt(td / 35000.0)
  const ttf = transmissionFluidCost * Number.parseInt(td / 30000.0)
  const tcc = coolantReplaceCost * n
  const tbr = batteryReplacementCost * (n / 3.0)

  const tmc = ttc + tbc + ttf + tcc + tbr

  const fuelCost = Number.parseFloat(document.getElementById("fuelCost").value) || 0
  const fuelEfficiency = Number.parseFloat(document.getElementById("fuelEfficiency").value) || 1
  const carCostByInsurance = Number.parseFloat(document.getElementById("carCostByInsurance").value) || 0
  const insuranceCost = Number.parseFloat(document.getElementById("insuranceCost").value) || 0

  const fuel = fuelCost
  const distance = fuelEfficiency
  let tic = carCostByInsurance
  const percentage = insuranceCost

  const tfc = (Number.parseFloat(td) / distance) * fuel
  tic = ((tic * percentage) / 100) * n

  const toc = tfc + tic
  totalMonthlyCost =
    totalMonthlyCost + (Number.parseFloat(td_month) / distance) * fuel + Number.parseFloat(tic) / (12.0 * n)

  const vehicleEmissionCost = Number.parseFloat(document.getElementById("vehicleEmissionCost").value) || 0
  const serviceCost = Number.parseFloat(document.getElementById("serviceCost").value) || 0
  const carWashCost = Number.parseFloat(document.getElementById("carWashCost").value) || 0

  const tet = vehicleEmissionCost * n
  const tfs = (Number.parseFloat(td) / 5000) * serviceCost
  const tcw = (12 * n - Number.parseFloat(td) / 5000) * carWashCost

  const tsc = tet + tfs + tcw
  totalMonthlyCost = totalMonthlyCost + tfs / (12.0 * n) + carWashCost

  const supplementaryCost = Number.parseFloat(document.getElementById("supplementaryCost").value) || 0
  const lease = Number.parseFloat(document.getElementById("lease").value) || 0
  const leaseRate = Number.parseFloat(document.getElementById("leaseRate").value) || 0

  let sc = (carPrice * supplementaryCost) / 100
  sc = sc * 0.25 * n
  const lr = (lease * leaseRate) / 100
  let ls = 0.0
  ls = ls + lease / (12 * n)
  ls = ls + lr * (1.0 / (12 * n))

  const totherc = sc + lr + lease
  totalMonthlyCost = totalMonthlyCost + ls + sc / 3.0

  let cd = carPrice
  const d = [15, 10, 10, 5, 5, 3, 3, 2, 2, 1]

  const depsec = document.getElementById("depreciation")
  let depHtml = "<h3>Vehicle Depreciation over the years:</h3><ul>"
  for (let i = 0; i < n; i++) {
    cd = cd - (cd * d[i]) / 100
    depHtml += `<li><span>Year ${i + 1}</span> <span>Rs. ${cd.toFixed(2)}</span></li>`
  }
  depHtml += `<li><span>Final Value</span> <span>Rs. ${cd.toFixed(2)}</span></li></ul>`
  depsec.innerHTML = depHtml

  const res = document.getElementById("results")
  const sum = tmc + toc + tsc + totherc
  const totalMonthlyCost2 = totalMonthlyCost - ls

  res.innerHTML = `
        <ul>
            <li><span>Total Cost (${n} years)</span> <span>Rs. ${sum.toFixed(2)}</span></li>
            <li><span>Monthly Lease</span> <span>Rs. ${ls.toFixed(2)}</span></li>
            <li><span>Total Monthly Cost</span> <span>Rs. ${totalMonthlyCost.toFixed(2)}</span></li>
            <li><span>Monthly Cost (No Lease)</span> <span>Rs. ${totalMonthlyCost2.toFixed(2)}</span></li>
            <li><span>Final Car Value</span> <span>Rs. ${cd.toFixed(2)}</span></li>
        </ul>
    `

  document.getElementById("costForm").style.display = "none"
  document.querySelector(".progress-container").style.display = "none"
  document.getElementById("results-container").classList.remove("hidden")
  window.scrollTo(0, 0)
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateProgress()

  document.getElementById("calc").addEventListener("click", calculateCost)
})

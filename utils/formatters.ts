export function formatCurrency(amount: string | number): string {
  if (typeof amount === "string") {
    // If it's already formatted like "$1,000,000"
    if (amount.startsWith("$")) {
      return amount
    }

    // Try to parse the string to a number
    amount = Number.parseFloat(amount)
    if (isNaN(amount)) {
      return "N/A"
    }
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value}%`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export const scenariosData = [
  {
    id: "ransomware-1",
    title: "Ransomware Attack",
    description:
      "A sophisticated ransomware attack encrypts critical business data and systems, demanding payment for decryption keys.",
    frequency: "High",
    averageCost: "$750,000",
    industryImpact: {
      Retail: "High",
      Manufacturing: "High",
      Healthcare: "Critical",
    },
    businessImpacts: [
      "Business Interruption",
      "Data Recovery Costs",
      "Forensic Investigation",
      "Potential Regulatory Fines",
    ],
    realWorldExample:
      "A mid-sized retailer experienced a ransomware attack that encrypted their inventory management and point-of-sale systems. The business was unable to process transactions for 5 days, resulting in approximately $350,000 in lost revenue and $400,000 in recovery costs.",
  },
  {
    id: "data-breach-1",
    title: "Customer Data Breach",
    description:
      "Unauthorized access to customer databases results in the theft of personally identifiable information (PII).",
    frequency: "Medium",
    averageCost: "$1,200,000",
    industryImpact: {
      Retail: "Critical",
      Manufacturing: "Medium",
      Healthcare: "Critical",
    },
    businessImpacts: [
      "Notification Costs",
      "Credit Monitoring Services",
      "Legal Expenses",
      "Regulatory Fines",
      "Reputational Damage",
    ],
    realWorldExample:
      "A healthcare provider experienced a breach affecting 50,000 patient records. The organization incurred costs for forensic investigation ($150,000), patient notification and credit monitoring ($500,000), legal defense ($300,000), and regulatory fines ($250,000).",
  },
  {
    id: "business-email-1",
    title: "Business Email Compromise",
    description:
      "Attackers gain access to corporate email accounts and use them to conduct fraudulent wire transfers or steal sensitive information.",
    frequency: "High",
    averageCost: "$130,000",
    industryImpact: {
      Retail: "Medium",
      Manufacturing: "High",
      Healthcare: "Medium",
    },
    businessImpacts: ["Financial Theft", "Data Exfiltration", "Remediation Costs", "Business Relationship Damage"],
    realWorldExample:
      "A manufacturing company's finance department received what appeared to be a legitimate email from their CEO requesting an urgent wire transfer to a new supplier. The company transferred $175,000 before discovering the fraud. Despite immediate action, only $45,000 was recovered.",
  },
]

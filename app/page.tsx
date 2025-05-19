import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Shield, BarChart, FileText, AlertTriangle } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cyber Insights Tool</h1>
            <p className="text-xl text-muted-foreground mb-6">Revealing Coverage Gaps with Real-World Data</p>
            <p className="text-lg mb-8">
              Understand your cyber risks with clarity using WTW's extensive claims database. See exactly where your
              coverage gaps are with real-world scenarios specific to your business.
            </p>
            <Link href="/business-profile">
              <Button size="lg" className="font-medium">
                Open Prototype
              </Button>
            </Link>
          </div>
          <div className="flex-1">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?key=dkqmd"
                alt="Cyber Insights Visualization"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Data-Driven Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Powered by WTW's extensive claims database with real-world cyber incidents and their financial impacts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <BarChart className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Business-Specific Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tailored to your industry, size, and technology profile for relevant risk assessment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <AlertTriangle className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Coverage Gap Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Identifies specific areas where your current insurance may leave you exposed to financial loss.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Actionable Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clear next steps to enhance your cyber security posture and insurance coverage.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Your Profile</h3>
              <p className="text-muted-foreground">
                Confirm your business and technology profile information to ensure accurate analysis.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Coverage Gaps</h3>
              <p className="text-muted-foreground">
                See where your current coverage may leave you exposed based on real claims data.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive tailored recommendations to enhance your cyber risk management strategy.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to see your cyber risk profile?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start exploring how real-world cyber incidents could impact your business.
          </p>
          <Link href="/business-profile">
            <Button size="lg" className="font-medium">
              Open Prototype
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

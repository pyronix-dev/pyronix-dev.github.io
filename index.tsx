'use client'

import { useState, useEffect } from 'react'
import { Twitter, Github, Sun, Moon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const WORKER_URL = 'https://ppcrossoriginrelayhandler.rzotime.workers.dev'

interface PurchaseData {
  id: string
  status: string
  amount: {
    value: string
    currency_code: string
  }
  create_time: string
}

export default function ThankYouPage() {
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const params = new URLSearchParams(window.location.search)
      const orderId = params.get('orderID')

      if (orderId) {
        try {
          const response = await fetch(`${WORKER_URL}/api/get-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId })
          })

          if (!response.ok) throw new Error('Failed to fetch order details')

          const data = await response.json()
          if (data.captureData && data.captureData.purchase_units[0]?.payments?.captures[0]) {
            const capture = data.captureData.purchase_units[0].payments.captures[0]
            setPurchaseData({
              id: data.captureData.id,
              status: data.captureData.status,
              amount: capture.amount,
              create_time: capture.create_time
            })
          }
        } catch (error) {
          console.error('Error fetching order details:', error)
        }
      }
    }

    fetchOrderDetails()
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} backdrop-blur supports-[backdrop-filter]:bg-opacity-80`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.span 
            className="text-xl font-bold"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            Pyronix
          </motion.span>
          <div className="space-x-4">
            <Button variant="ghost" className={isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}>Home</Button>
            <Button variant="ghost" className={isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}>FAQ</Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`w-full max-w-md ${isDarkMode ? 'bg-[#121212] border-gray-800' : 'bg-white border-gray-200'}`}>
            <CardHeader className="text-center">
              <motion.div 
                className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              </motion.div>
              <CardTitle className="text-2xl font-bold">Thank You For Your Purchase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Check your email inbox. We've sent you the license key.
              </p>
              <AnimatePresence>
                {purchaseData ? (
                  <motion.div 
                    className={`space-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Order ID:</span>
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{purchaseData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{purchaseData.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Amount:</span>
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{purchaseData.amount.value} {purchaseData.amount.currency_code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Payment Date:</span>
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{new Date(purchaseData.create_time).toLocaleString()}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p 
                    className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Loading purchase details...
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.div 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg text-sm text-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Need help? Contact us at <a href="mailto:support@pyronix.com" className="text-blue-400 hover:underline">support@pyronix.com</a>
                <br />We're here to assist you 24/7.
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <motion.footer 
        className={`py-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="outline" size="icon" className={isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-200 border-gray-300 hover:bg-gray-300"}>
              <Twitter className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </Button>
            <Button variant="outline" size="icon" className={isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-gray-200 border-gray-300 hover:bg-gray-300"}>
              <Github className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </Button>
          </div>
          <div className="space-x-4 mb-4">
            <Button variant="link" className={isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}>Privacy Policy</Button>
            <Button variant="link" className={isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}>Terms of Service</Button>
            <Button variant="link" className={isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}>Support</Button>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>© 2024 Pyronix. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}

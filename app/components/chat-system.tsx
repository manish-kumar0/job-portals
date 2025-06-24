"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, X } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isOwn: boolean
}

interface ChatSystemProps {
  recipientName: string
  recipientAvatar?: string
}

export function ChatSystem({ recipientName, recipientAvatar }: ChatSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: recipientName,
      content: "Hi! I saw your application for the Software Engineer position. I'd like to discuss it further.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isOwn: false,
    },
    {
      id: "2",
      sender: "You",
      content: "Thank you for reaching out! I'm very interested in the position.",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isOwn: true,
    },
    {
      id: "3",
      sender: recipientName,
      content: "Great! Are you available for a quick call tomorrow at 2 PM?",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      isOwn: false,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: recipientName,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
        isOwn: false,
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="rounded-full h-12 w-12 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 h-96 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={recipientAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{recipientName[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm">{recipientName}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.isOwn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

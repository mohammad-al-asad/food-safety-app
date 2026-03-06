"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, Image as ImageIcon } from "lucide-react";
import messagesData from "./messages.json";

type ChatMessage = {
  id: string;
  sender: "contact" | "self";
  text: string;
  time: string;
  attachment?: string;
};

type ChatContact = {
  id: string;
  name: string;
  role: string;
  time: string;
  avatar: string;
  messages: ChatMessage[];
};

type MessagesApiResponse = {
  conversations: ChatContact[];
};

const mockMessagesResponse = messagesData as MessagesApiResponse;

export default function ChatPage() {
  const contacts = mockMessagesResponse.conversations;

  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    contacts[0]?.id ?? null,
  );

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) ??
    contacts[0] ??
    null;

  if (contacts.length === 0 || !selectedContact) {
    return (
      <div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-sm">
          <div className="bg-main px-4 py-4">
            <h1 className="text-3xl font-medium text-white">Inbox</h1>
          </div>

          <div className="flex min-h-130 items-center justify-center px-6 text-center">
            <p className="max-w-sm text-xl leading-relaxed text-[#475569]">
              You don&apos;t have any messages yet. They&apos;ll appear here once you do.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8.5rem)] min-h-[calc(100vh-7.6rem)] overflow-hidden rounded-2xl border border-gray-200 bg-card text-body">
      <aside className="hidden w-80 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`flex cursor-pointer items-center gap-3 border-b border-gray-100 p-4 ${
                contact.id === selectedContact.id ? "bg-main/10" : "hover:bg-gray-50"
              }`}
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="truncate font-semibold text-heading">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-muted">{contact.time}</span>
                </div>
                <p className="truncate text-sm text-muted">{contact.role}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex flex-1 flex-col bg-white">
        <header className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <h1 className="text-lg font-semibold text-heading">{selectedContact.name}</h1>
        </header>

        <section className="flex-1 space-y-6 overflow-y-auto p-6">
          {selectedContact.messages.map((message) => {
            const isSelf = message.sender === "self";

            if (isSelf) {
              return (
                <div key={message.id} className="flex flex-col items-end space-y-1">
                  <span className="mr-1 text-xs text-muted">{message.time}</span>
                  <div className="max-w-md rounded-2xl rounded-tr-none border border-gray-200 bg-white p-4 text-body shadow-sm">
                    {message.text}
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className="flex max-w-2xl gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-300">
                  <Image
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <span className="ml-1 text-xs text-muted">{message.time}</span>
                  <div className="leading-relaxed rounded-2xl rounded-tl-none bg-main p-4 text-white shadow-sm">
                    {message.text}
                  </div>
                  {message.attachment && (
                    <div className="h-32 w-48 overflow-hidden rounded-xl border border-gray-200">
                      <Image
                        src={message.attachment}
                        alt="attachment"
                        width={200}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <footer className="border-t border-gray-100 p-4">
          <div className="relative mx-auto flex max-w-4xl items-center">
            <button className="absolute left-4 p-2 text-muted transition-colors hover:text-main">
              <ImageIcon size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pr-14 pl-14 transition-all focus:ring-2 focus:ring-main/20 focus:outline-none"
            />
            <button className="absolute right-2 rounded-full bg-main p-2 text-white shadow-md transition-all hover:opacity-90">
              <Send size={18} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

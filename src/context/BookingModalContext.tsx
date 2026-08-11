"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BookingModal } from "@/components/ui/BookingModal";

interface BookingModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <BookingModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeModal} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}

"use client";

import { useEffect, useState } from "react";

import { feedbackAPI } from "@/app/services/feedback.api";

export type FeedbackStatusType =
  | "Pending"
  | "Approved"
  | "Rejected";

interface FeedbackStatusProps {
  id: number;

  status: FeedbackStatusType;

  onUpdate?: (
    newStatus: FeedbackStatusType
  ) => void;
}

export default function FeedbackStatus({
  id,
  status,
  onUpdate,
}: FeedbackStatusProps) {
  // ==========================================
  // CURRENT STATUS
  // ==========================================

  const [currentStatus, setCurrentStatus] =
    useState<FeedbackStatusType>(status);

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // KEEP LOCAL STATE IN SYNC
  // WITH PARENT DATA
  // ==========================================

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  // ==========================================
  // STATUS STYLES
  // ==========================================

  const statusStyle: Record<
    FeedbackStatusType,
    string
  > = {
    Pending:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    Approved:
      "bg-green-100 text-green-700 border-green-200",

    Rejected:
      "bg-red-100 text-red-700 border-red-200",
  };

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus =
      e.target.value as FeedbackStatusType;

    // ----------------------------------------
    // Nothing changed
    // ----------------------------------------

    if (newStatus === currentStatus) {
      return;
    }

    // ----------------------------------------
    // Save previous status
    // for rollback
    // ----------------------------------------

    const previousStatus =
      currentStatus;

    try {
      setLoading(true);

      // --------------------------------------
      // API CALL
      // PATCH /api/feedback/:id/status
      // --------------------------------------

      await feedbackAPI.updateStatus(
        id,
        newStatus
      );

      // --------------------------------------
      // Update local status
      // --------------------------------------

      setCurrentStatus(newStatus);

      // --------------------------------------
      // Tell parent table
      // --------------------------------------

      onUpdate?.(newStatus);
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      // --------------------------------------
      // Rollback
      // --------------------------------------

      setCurrentStatus(
        previousStatus
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update feedback status."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading}
      aria-label="Feedback status"
      className={`
        rounded-full
        border
        px-3
        py-1.5
        text-sm
        font-medium
        outline-none
        cursor-pointer
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${statusStyle[currentStatus]}
      `}
    >
      <option value="Pending">
        Pending
      </option>

      <option value="Approved">
        Approved
      </option>

      <option value="Rejected">
        Rejected
      </option>
    </select>
  );
}
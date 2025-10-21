import { API } from "../utils/api";

const register = async (data: any) => {
  try {
    const response = await fetch(API.TICKETS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    console.error("========= Error Register Ticket:", error);
    return false;
  }
};

const getTicketFilter = async (filter: string) => {
  try {
    const response = await fetch(API.TICKETS.GET_TICKET_FILTER + filter, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error: any) {
    console.error("========= Error Get Ticket Filter:", error);
    return false;
  }
};

export const TicketsService = {
  register,
  getTicketFilter,
};

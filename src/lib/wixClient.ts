import { createClient, OAuthStrategy } from '@wix/sdk';
import { contacts } from '@wix/crm';
import { items } from '@wix/data';

/**
 * Wix Headless Client
 * Connects your custom React frontend to Wix's Backend Services
 * (Wix CRM, Wix CMS Data Collections, Wix Bookings, & Wix Forms)
 */
const getWixClientId = (): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_WIX_CLIENT_ID) {
    return (import.meta as any).env.VITE_WIX_CLIENT_ID;
  }
  return '';
};

const clientId = getWixClientId();

export const wixClient = createClient({
  modules: {
    contacts,
    items,
  },
  auth: OAuthStrategy({
    clientId: clientId || 'wix-headless-client-id',
  }),
});

/**
 * Submit a client ingestion lead directly into Wix CRM Contacts & Activity Inbox
 */
export async function submitWixLead(email: string, details?: { name?: string; message?: string; projectType?: string }) {
  try {
    if (!clientId) {
      console.info('ℹ️ [WIX HEADLESS] VITE_WIX_CLIENT_ID not set. Lead captured by local backend.');
      return { fallback: true };
    }

    // Create or update contact in Wix CRM
    const response = await (wixClient.contacts as any).createContact({
      emails: [{ email, primary: true }],
      name: details?.name ? { first: details.name } : undefined,
      labelKeys: ['custom.kritvideo-lead', 'custom.website-ingestion'],
    });

    console.log('✅ [WIX HEADLESS] Lead saved to Wix CRM Contacts:', response);
    return { success: true, contact: response };
  } catch (error: any) {
    console.warn('⚠️ [WIX HEADLESS] Notice from Wix CRM API:', error?.message || error);
    return { success: false, error };
  }
}

/**
 * Fetch dynamic portfolio projects from Wix CMS (Data Collections)
 */
export async function fetchWixProjects(dataCollectionId: string = 'PortfolioVideos') {
  try {
    if (!clientId) return [];
    const queryResult = await (wixClient.items as any).query(dataCollectionId).find();
    return queryResult.items;
  } catch (error) {
    console.warn(`⚠️ [WIX HEADLESS] Could not query Wix collection "${dataCollectionId}":`, error);
    return [];
  }
}

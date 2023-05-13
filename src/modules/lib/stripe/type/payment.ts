export interface PaymentEventObj {
  id: string
  object: string
  api_version: string
  created: number
  data: {
    object: {
      id: string
      object: string
      amount: number
      amount_captured: number
      amount_refunded: number
      application: null
      application_fee: null
      application_fee_amount: null
      balance_transaction: string
      billing_details: {
        address: {
          city: null
          country: string
          line1: null
          line2: null
          postal_code: null
          state: null
        }
        email: string
        name: string
        phone: null
      }
      calculated_statement_descriptor: string
      captured: boolean
      created: number
      currency: string
      customer: null
      description: string
      destination: null
      dispute: null
      disputed: boolean
      failure_balance_transaction: null
      failure_code: null
      failure_message: null
      fraud_details: Record<string, unknown>
      invoice: null
      livemode: boolean
      metadata: Record<string, unknown>
      on_behalf_of: null
      order: null
      outcome: {
        network_status: string
        reason: null
        risk_level: string
        risk_score: number
        seller_message: string
        type: string
      }
      paid: boolean
      payment_intent: string
      payment_method: string
      payment_method_details: {
        card: {
          brand: string
          checks: {
            address_line1_check: null
            address_postal_code_check: null
            cvc_check: string
          }
          country: string
          exp_month: number
          exp_year: number
          fingerprint: string
          funding: string
          installments: null
          last4: string
          mandate: null
          network: string
          network_token: { used: boolean }
          three_d_secure: null
          wallet: null
        }
        type: string
      }
      receipt_email: null
      receipt_number: null
      receipt_url: string
      refunded: boolean
      review: null
      shipping: null
      source: null
      source_transfer: null
      statement_descriptor: null
      statement_descriptor_suffix: null
      status: string
      transfer_data: null
      transfer_group: null
    }
  }
  livemode: boolean
  pending_webhooks: number
  request: {
    id: string
    idempotency_key: string
  }
  type: string
}

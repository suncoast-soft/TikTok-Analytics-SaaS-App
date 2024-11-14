import * as crypto from 'crypto'

const { TIKTOK_APP_SECRET, TIKTOK_SHOP_BASE } = process.env

interface APIParams {
  [key: string]: string | number
}

interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: string
}

function generateSignature(apiPath: string, params: APIParams): string {
  const paramsString = new URLSearchParams(
    params as Record<string, string>
  ).toString()
  const dataToSign = `${apiPath}?${paramsString}`
  return crypto
    .createHmac('sha256', TIKTOK_APP_SECRET!)
    .update(dataToSign)
    .digest('hex')
}

export async function requestAPI(
  api_path: string,
  params: APIParams,
  options: RequestOptions = {}
): Promise<Response> {
  const urlSearchParams = new URLSearchParams(params as Record<string, string>)
  const signature = generateSignature(api_path, params)
  urlSearchParams.append('signature', signature)

  const fetchURL = `${TIKTOK_SHOP_BASE}/${api_path}?${urlSearchParams.toString()}`

  try {
    const response = await fetch(fetchURL, options)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

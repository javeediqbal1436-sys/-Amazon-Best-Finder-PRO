/**
 * Amazon Affiliate & Sharing Utilities
 */

export function buildAmazonAffiliateUrl(asin: string, affiliateTag = 'shorkot-20'): string {
  const cleanAsin = asin.trim();
  const cleanTag = affiliateTag.trim() || 'shorkot-20';
  return `https://www.amazon.com/dp/${cleanAsin}?tag=${encodeURIComponent(cleanTag)}&linkCode=as2`;
}

export function buildWhatsAppShareUrl(title: string, price: number, affiliateUrl: string): string {
  const message = `🔥 Check out this Amazon Deal: *${title}* for only *$${price.toFixed(2)}*!\n\n🛒 Buy on Amazon here: ${affiliateUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

export function buildFacebookShareUrl(affiliateUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateUrl)}`;
}

export function buildTwitterShareUrl(title: string, affiliateUrl: string): string {
  const text = `🔥 Amazing deal on Amazon: ${title}! Get it now:`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(affiliateUrl)}&hashtags=AmazonFinds,Deals`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy error:', err);
    return false;
  }
}

export async function trackProductClick(
  productId: string,
  productTitle: string,
  asin: string,
  price: number,
  referrer: string,
  category: string
) {
  try {
    await fetch('/api/analytics/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        productTitle,
        asin,
        price,
        referrer,
        category,
      }),
    });
  } catch (e) {
    // Non-blocking telemetry
    console.debug('Click track skipped:', e);
  }
}

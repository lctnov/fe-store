import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Nếu request là đúng đường dẫn Chrome DevTools tìm
  if (request.nextUrl.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    // Trả về JSON rỗng
    return new NextResponse(JSON.stringify({}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Không thì tiếp tục
  return NextResponse.next();
}

export const config = {
	matcher: '/.well-known/:path*',
};
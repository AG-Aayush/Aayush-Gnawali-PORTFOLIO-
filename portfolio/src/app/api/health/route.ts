export function GET() {
  return Response.json({
    status: "ok",
    service: "portfolio",
    timestamp: new Date().toISOString(),
  });
}

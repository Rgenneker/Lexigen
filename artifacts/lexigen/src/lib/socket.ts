import { io, type Socket } from "socket.io-client";

let _socket: Socket | null = null;

export function getBeeSocket(userId?: number, userName?: string): Socket {
  if (_socket && _socket.connected) return _socket;
  if (_socket) {
    _socket.disconnect();
    _socket = null;
  }
  _socket = io({
    path: "/api/socket.io",
    autoConnect: false,
    auth: { userId: userId ?? 0, userName: userName ?? "Guest" },
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  return _socket;
}

export function disconnectBeeSocket(): void {
  if (_socket) {
    _socket.disconnect();
    _socket = null;
  }
}

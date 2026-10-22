from http.server import BaseHTTPRequestHandler, HTTPServer
import json


profile = {
    "heroTitle": "关于我",
    "heroSubtitle": "项目，创意，灵感，心得，我的作品",
}


class Handler(BaseHTTPRequestHandler):
    def send_json(self, status_code, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "http://localhost:5173")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "http://localhost:5173")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/profile":
            self.send_json(200, profile)
            return

        self.send_json(404, {"error": "接口不存在"})

    def log_message(self, format_string, *args):
        # 保留简洁的访问日志，避免默认日志混入过多服务器信息。
        print(f"{self.command} {self.path}")


if __name__ == "__main__":
    server = HTTPServer(("", 8000), Handler)
    print("后端已启动：http://localhost:8000/api/profile")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n后端已停止")
    finally:
        server.server_close()

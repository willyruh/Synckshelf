import 'dart:convert';
import 'package:http/http.dart' as http;

class APIClient {
  static const String _baseUrl = 'http://192.168.159.87:8001'; // Local network IP for device testing
  
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': email, 'password': password}),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to login: ${response.body}');
    }
  }

  static Future<List<dynamic>> getDashboardStats() async {
    final response = await http.get(Uri.parse('$_baseUrl/api/analytics/dashboard-stats'));
    if (response.statusCode == 200) {
      return [jsonDecode(response.body)];
    } else {
      throw Exception('Failed to load stats');
    }
  }

  static Future<List<dynamic>> getInventory() async {
    final response = await http.get(Uri.parse('$_baseUrl/api/inventory/'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load inventory');
    }
  }
}

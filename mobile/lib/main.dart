import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/core/theme.dart';
import 'package:mobile/features/auth/splash_view.dart';
import 'package:mobile/features/auth/login_view.dart';
import 'package:mobile/features/dashboard/dashboard_view.dart';

void main() {
  runApp(
    const ProviderScope(
      child: SynckShelfApp(),
    ),
  );
}

class SynckShelfApp extends StatelessWidget {
  const SynckShelfApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SynckShelf',
      debugShowCheckedModeBanner: false,
      theme: SynckTheme.darkTheme,
      // For demo purposes, we can toggle between Splash and Dashboard
      home: const SplashView(),
      routes: {
        '/login': (context) => const LoginView(),
        '/dashboard': (context) => const DashboardView(),
      },
    );
  }
}

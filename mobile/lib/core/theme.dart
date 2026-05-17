import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SynckColors {
  static const Color primary = Color(0xFF4EDEA3);
  static const Color primaryContainer = Color(0xFF10B981);
  static const Color onPrimary = Color(0xFF003824);
  
  static const Color secondary = Color(0xFF8FD3CC);
  static const Color secondaryContainer = Color(0xFF005550);
  
  static const Color tertiary = Color(0xFFDDB7FF);
  static const Color tertiaryContainer = Color(0xFFC487FF);
  
  static const Color error = Color(0xFFFFB4AB);
  static const Color errorContainer = Color(0xFF93000A);
  
  static const Color background = Color(0xFF0C1324);
  static const Color surface = Color(0xFF151B2D);
  static const Color surfaceVariant = Color(0xFF23293C);
  
  static const Color onSurface = Color(0xFFDCE1FB);
  static const Color onSurfaceVariant = Color(0xFFBBCABF);
  
  static const Color outline = Color(0xFF3C4A42);
}

class SynckTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: SynckColors.background,
      colorScheme: const ColorScheme.dark(
        primary: SynckColors.primary,
        onPrimary: SynckColors.onPrimary,
        secondary: SynckColors.secondary,
        tertiary: SynckColors.tertiary,
        error: SynckColors.error,
        surface: SynckColors.surface,
        onSurface: SynckColors.onSurface,
        surfaceVariant: SynckColors.surfaceVariant,
        onSurfaceVariant: SynckColors.onSurfaceVariant,
        outline: SynckColors.outline,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.inter(
          fontWeight: FontWeight.w800,
          color: SynckColors.onSurface,
        ),
        titleLarge: GoogleFonts.inter(
          fontWeight: FontWeight.bold,
          color: SynckColors.onSurface,
        ),
        bodyMedium: GoogleFonts.inter(
          color: SynckColors.onSurfaceVariant,
        ),
      ),
      cardTheme: const CardThemeData(
        color: SynckColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(16)),
          side: BorderSide(color: Color.fromRGBO(255, 255, 255, 0.08)),
        ),
      ),
    );
  }
}

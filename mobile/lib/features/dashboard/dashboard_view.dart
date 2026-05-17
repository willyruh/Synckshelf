import 'package:flutter/material.dart';
import 'package:mobile/core/theme.dart';
import 'package:mobile/widgets/glass_card.dart';
import 'package:mobile/widgets/status_badge.dart';
import 'package:lucide_icons/lucide_icons.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'SynckShelf',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20, color: SynckColors.primary),
            ),
            Row(
              children: [
                Icon(LucideIcons.mapPin, size: 10, color: SynckColors.onSurfaceVariant.withOpacity(0.6)),
                const SizedBox(width: 4),
                Text(
                  'MAIN STREET HUB',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: SynckColors.onSurfaceVariant.withOpacity(0.6), letterSpacing: 1),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(LucideIcons.bell, color: SynckColors.onSurface),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: SynckColors.surfaceVariant,
              child: Icon(LucideIcons.user, size: 16, color: SynckColors.onSurface),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Health Score Section
            GlassCard(
              padding: const EdgeInsets.all(20),
              child: Row(
                children: [
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 80,
                        height: 80,
                        child: CircularProgressIndicator(
                          value: 0.84,
                          strokeWidth: 8,
                          backgroundColor: Colors.white.withOpacity(0.05),
                          valueColor: const AlwaysStoppedAnimation(SynckColors.primary),
                        ),
                      ),
                      const Text(
                        '84%',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: SynckColors.primary),
                      ),
                    ],
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const StatusBadge(label: 'Optimal', color: SynckColors.primary),
                        const SizedBox(height: 8),
                        Text(
                          'Inventory health is stable. AI detected cold-chain efficiency.',
                          style: TextStyle(fontSize: 13, color: SynckColors.onSurfaceVariant.withOpacity(0.8)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // KPI Grid
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.4,
              children: [
                _buildKPICard(context, LucideIcons.timer, '48', 'Products Expiring', SynckColors.error),
                _buildKPICard(context, LucideIcons.leaf, '12%', 'Waste Reduced', SynckColors.primary),
                _buildKPICard(context, LucideIcons.trendingUp, 'High', 'Predicted Load', SynckColors.tertiary),
                _buildKPICard(context, LucideIcons.box, '1,240', 'Active SKUs', SynckColors.secondary),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'OPERATIONAL FEED',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 2, color: SynckColors.onSurfaceVariant),
            ),
            const SizedBox(height: 12),
            // Feed Items
            _buildFeedItem(LucideIcons.package, 'Inventory Inbound', 'Main Street Hub received 450 units of Kale.', '2m ago', SynckColors.primary),
            _buildFeedItem(LucideIcons.zap, 'AI Anomaly Alert', 'Unusual demand spike predicted for Oats.', '1h ago', SynckColors.tertiary),
            _buildFeedItem(LucideIcons.alertTriangle, 'Expiry Alert', '12 units of Ribeye Steak expire in 6h.', '2h ago', SynckColors.error),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: SynckColors.surface,
        selectedItemColor: SynckColors.primary,
        unselectedItemColor: SynckColors.onSurfaceVariant,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(LucideIcons.layoutGrid), label: 'Dash'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.package), label: 'Stock'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.bell), label: 'Alerts'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.brainCircuit), label: 'AI'),
        ],
      ),
    );
  }

  Widget _buildKPICard(BuildContext context, IconData icon, String value, String label, Color color) {
    return GlassCard(
      padding: const EdgeInsets.all(12),
      border: Border.all(color: color.withOpacity(0.1)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Icon(icon, size: 18, color: color),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              Text(label.toUpperCase(), style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: SynckColors.onSurfaceVariant.withOpacity(0.6))),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFeedItem(IconData icon, String title, String desc, String time, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: SynckColors.surface.withOpacity(0.5),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, size: 16, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    Text(time, style: TextStyle(fontSize: 10, color: SynckColors.onSurfaceVariant.withOpacity(0.4))),
                  ],
                ),
                const SizedBox(height: 2),
                Text(desc, style: TextStyle(fontSize: 12, color: SynckColors.onSurfaceVariant.withOpacity(0.8))),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

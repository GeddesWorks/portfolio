import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_fadein/flutter_fadein.dart';
import 'package:portfilio/view/homeWidgets/customAvatar.dart'; // Assuming you have required dependencies imported

class Header extends StatelessWidget {
  final String title;
  final String subtitle;
  final String location;
  final String avatarUrl;

  Header({
    required this.title,
    required this.subtitle,
    required this.location,
    required this.avatarUrl,
  });

  @override
  Widget build(BuildContext context) {
    return FadeIn(
      controller: FadeInController(autoStart: true),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 24,
              ),
            ),
            Text(
              subtitle,
              style: const TextStyle(
                fontSize: 16,
              ),
            ),
            Text(
              location,
              style: const TextStyle(
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 20),
            CustomAvatar(image: avatarUrl),
          ],
        ),
      ),
    );
  }
}

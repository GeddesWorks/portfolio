import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_fadein/flutter_fadein.dart';
import 'package:portfilio/view/homeWidgets/customAvatar.dart'; // Assuming you have required dependencies imported

class Header extends StatelessWidget {
  final String title;
  final String subtitle;
  final String location;
  final String avatarUrl;
  final double scaleFactor;

  Header({
    required this.title,
    required this.subtitle,
    required this.location,
    required this.avatarUrl,
    required this.scaleFactor,
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
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 24 * scaleFactor,
              ),
            ),
            Text(
              subtitle,
              style: TextStyle(
                fontSize: 16 * scaleFactor,
              ),
            ),
            Text(
              location,
              style: TextStyle(
                fontSize: 12 * scaleFactor,
              ),
            ),
            const SizedBox(height: 20),
            Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                  image: AssetImage(
                      avatarUrl), // Assuming the image path is correct
                  fit: BoxFit.cover,
                ),
              ),
              width: 100 * scaleFactor * .75,
              height: 100 * scaleFactor * .75,
              margin: EdgeInsets.zero,
            ),
          ],
        ),
      ),
    );
  }
}

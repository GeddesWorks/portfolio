import 'package:flutter/material.dart';

class CustomAvatar extends StatelessWidget {
  final String image;

  const CustomAvatar({super.key, required this.image});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          image: AssetImage(image), // Assuming the image path is correct
          fit: BoxFit.cover,
        ),
      ),
      width: 100,
      height: 100,
      margin: EdgeInsets.zero,
    );
  }
}

import 'package:flutter/material.dart';

class ParagraphHeader extends StatelessWidget {
  final Widget child;

  ParagraphHeader({required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 3, bottom: 16),
      child: Text(
        child.toString(),
        style: const TextStyle(
          decoration: TextDecoration.underline,
          fontSize: 20,
          decorationColor: Color(0xFF525252),
          decorationThickness: 4,
        ),
      ),
    );
  }
}

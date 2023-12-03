import 'package:flutter/material.dart';

class ContentWrapper extends StatelessWidget {
  final Widget child;
  final double footerPadding;

  ContentWrapper({required this.child, required this.footerPadding});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(20, 100, 20, footerPadding),
      child: child,
    );
  }
}

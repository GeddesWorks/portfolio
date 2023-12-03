import 'package:flutter/material.dart';
import 'package:portfilio/view/homeWidgets/paragraphHeader.dart';

class Paragraph extends StatelessWidget {
  final String sectionTitle;
  final Widget sectionContent;
  final bool isBio;

  Paragraph({
    required this.sectionTitle,
    required this.sectionContent,
    this.isBio = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ParagraphHeader(
            child: Text(
              sectionTitle,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ),
          isBio
              ? sectionContent
              : Text(
                  sectionContent
                      .toString(), // Assuming sectionContent is a string
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 16),
                ),
        ],
      ),
    );
  }
}

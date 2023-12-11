import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pdf_render/pdf_render_widgets.dart';
import 'package:portfilio/view/appBar.dart';
import 'package:portfilio/view/mainDrawer.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class ResumeScreen extends StatefulWidget {
  const ResumeScreen({super.key});

  static const routeName = '/resume';

  @override
  State<StatefulWidget> createState() {
    return ResumeScreenState();
  }
}

class ResumeScreenState extends State<ResumeScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double baseScale = screenWidth / 1200;
    double scaleFactor = screenWidth > 1200
        ? baseScale
        : screenWidth > 600
            ? baseScale * 2
            : baseScale * 2;

    return Scaffold(
      backgroundColor: Colors.grey[800],
      appBar: screenWidth > 975 ? appBar(context) : appBarSmall(),
      endDrawer:
          screenWidth <= 975 ? drawerContents(scaleFactor, context) : null,
      body: Row(
        children: [
          SizedBox(width: screenWidth > 1200 ? (screenWidth / 3) * .9 : 0),
          Center(
            child: Container(
              alignment: Alignment.center,
              width: screenWidth > 1200
                  ? (screenWidth / 3) * .9
                  : screenWidth * .9,
              child: SfPdfViewer.asset(
                'assets/Resume-12-23-web.pdf',
              ),
            ),
          ),
          SizedBox(width: screenWidth > 1200 ? (screenWidth / 3) * .9 : 0),
        ],
      ),
    );
  }
}

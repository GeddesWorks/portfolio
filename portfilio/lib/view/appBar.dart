import 'package:flutter/material.dart';
import 'dart:js' as js;

PreferredSizeWidget appBar(BuildContext context) {
  Image logo = Image.asset('images/GeddesWorksCutout.png');
  Image youtube =
      Image.asset('images/YouTube_dark_logo_(2017).png', width: 200);
  Image printer = Image.asset('images/3dPrinter.png', width: 50);

  return PreferredSize(
    preferredSize: const Size.fromHeight(80.0),
    child: AppBar(
      backgroundColor: Colors.grey[600],
      elevation: 0,
      flexibleSpace: Padding(
        padding: const EdgeInsets.all(15),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              flex: 4,
              child: Row(
                children: [
                  logo,
                  const SizedBox(width: 10),
                  const Text(
                    'Collin Geddes is GeddesWorks',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 6,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                    onPressed: () {
                      // Action for Resume
                    },
                    icon: Icon(Icons.description),
                  ),
                  IconButton(
                    onPressed: () {
                      // Action for Portfolio
                    },
                    icon: Icon(Icons.work),
                  ),
                  IconButton(
                    onPressed: () {
                      // Action for About
                    },
                    icon: Icon(Icons.info),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 4,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  InkWell(
                    borderRadius: BorderRadius.circular(100),
                    onTap: () {
                      js.context.callMethod(
                          'open', ['https://3dshop.geddesworks.com']);
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          printer,
                          const SizedBox(width: 5),
                          const Text('3D Print Shop'),
                        ],
                      ),
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      js.context.callMethod('open', [
                        'https://www.youtube.com/channel/UCl6UJ-zSBmVH_TGAgRP-gbw'
                      ]);
                    },
                    icon: youtube,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

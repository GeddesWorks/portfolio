import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_fadein/flutter_fadein.dart';
import 'package:portfilio/view/appBar.dart';
import 'package:portfilio/view/contentWrapper.dart';
import 'package:portfilio/view/homeWidgets/bioEntry.dart';
import 'package:portfilio/view/homeWidgets/header.dart';
import 'package:portfilio/view/homeWidgets/paragraph.dart';
import 'package:video_player/video_player.dart';
import 'dart:js' as js;

class Home extends StatefulWidget {
  const Home({super.key});

  static const routeName = '/';

  @override
  State<StatefulWidget> createState() {
    return HomeState();
  }
}

class HomeState extends State<Home> {
  late VideoPlayerController controller;

  @override
  void initState() {
    super.initState();
    controller = VideoPlayerController.networkUrl(Uri.parse(
        'https://firebasestorage.googleapis.com/v0/b/geddesworks-394c1.appspot.com/o/IntroVideoHD.mp4?alt=media&token=3de30eb0-6372-4097-a86e-b9c7560cbd22'))
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {
          controller.play();
          controller.setLooping(true);
        });
      });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Colors.grey[800],
      appBar: appBar(context),
      body: SingleChildScrollView(
        child: ContentWrapper(
          footerPadding: 16,
          child: FadeIn(
            duration: const Duration(milliseconds: 2000),
            controller: FadeInController(autoStart: true),
            child: screenWidth > 1200
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      videoSection(context, screenWidth / 2),
                      textSection(context, screenWidth / 2)
                    ],
                  )
                : Column(
                    children: [
                      videoSection(context, screenWidth),
                      textSection(context, screenWidth)
                    ],
                  ),
          ),
        ),
      ),
    );
  }

  Widget videoSection(BuildContext context, double width) {
    return Container(
      width: width * .9,
      height: ((width * .9) / 5) * 4,
      child: VideoPlayer(controller),
    );
  }

  Widget textSection(BuildContext context, double width) {
    Image cultsLogo = Image.asset(
      'images/cults.png',
      width: 50,
    );
    Image liInLogo = Image.asset(
      'images/Li-In-bug.png',
      width: 50,
    );
    Image githubLogo = Image.asset(
      'images/github-mark.png',
      width: 50,
    );

    return Container(
      color: Colors.grey[600],
      width: width * .9,
      height: ((width * .9) / 5) * 4,
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Header(
            title: 'Collin Geddes is GeddesWorks',
            subtitle: 'Developer Extraordinaire | 3D Printing Enthusiast',
            location: 'Edmond, OK',
            avatarUrl: 'images/GeddesWorksCutout.png',
          ),
          const SizedBox(height: 60),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                children: [
                  Text(
                    'About',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 12),
                  Text('Current Paycom Software Developer Intern'),
                  Text('Aspiring Full Stack Developer'),
                  Text('CS Student at UCO'),
                  Text('Drone Pilot'),
                ],
              ),
              Column(
                children: [
                  Text(
                    'Services',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 12),
                  Text('Full Stack'),
                  Text('Web Design'),
                  Text('3D Printing'),
                  Text('Arial Photography'),
                ],
              ),
            ],
          ),
          Spacer(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                onPressed: () {
                  js.context.callMethod('open',
                      ['https://cults3d.com/en/users/GeddesWorks/3d-models']);
                },
                icon: cultsLogo,
              ),
              IconButton(
                onPressed: () {
                  js.context
                      .callMethod('open', ['https://github.com/GeddesWorks']);
                },
                icon: githubLogo,
              ),
              IconButton(
                onPressed: () {
                  js.context
                      .callMethod('open', ['www.linkedin.com/in/collingeddes']);
                },
                icon: liInLogo,
              ),
            ],
          )
        ],
      ),
    );
  }
}

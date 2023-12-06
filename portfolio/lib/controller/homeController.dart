import 'package:portfilio/view/home_screen.dart';

class HomeController {
  HomeState state;
  HomeController(this.state);

  openMenuDrawer() {
    state.setState(() {
      state.model.menuDrawerOpen = true;
    });
  }
}

import { getStatusFromColor } from './utils/statusUtils.js';

class CalendarEntry {
  constructor(entry, today) {
    const user = entry.created_by || {};
    this.id = user.id;
    this.name = user.firstname || user.display_name || "Intet navn";
    this.birthday = user.birthday;
    this.status = getStatusFromColor(entry.color);
    this.photo = user.image_url || "/api/placeholder/100/100";
    this.startTime = entry.start_datetime;
    this.endTime = entry.end_datetime;
    this.title = entry.title;
    this.today = today;
  }

  hasBirthday() {
    return this.birthday === this.today;
  }
}
export { CalendarEntry };
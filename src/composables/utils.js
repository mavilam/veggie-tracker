export function getMonday(d) {
  d = new Date(d)
  var day = d.getDay()
  var diff = d.getDate() - day + (day == 0 ? -6 : 1)
  return new Date(d.setDate(diff)).toISOString().split('T')[0]
}
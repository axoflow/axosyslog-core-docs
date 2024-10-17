```shell
%%      PERCENT
%a      day of the week, abbreviated
%A      day of the week
%b      month abbr
%B      month
%c      MM/DD/YY HH:MM:SS
%C      ctime format: Sat Nov 19 21:05:57 1994
%d      numeric day of the month, with leading zeros (eg 01..31)
%e      like %d, but a leading zero is replaced by a space (eg  1..31)
%f      microseconds, leading 0's, extra digits are silently discarded
%D      MM/DD/YY
%G      GPS week number (weeks since January 6, 1980)
%h      month, abbreviated
%H      hour, 24 hour clock, leading 0's)
%I      hour, 12 hour clock, leading 0's)
%j      day of the year
%k      hour
%l      hour, 12 hour clock
%L      month number, starting with 1
%m      month number, starting with 01
%M      minute, leading 0's
%n      NEWLINE
%o      ornate day of month -- "1st", "2nd", "25th", etc.
%p      AM or PM
%P      am or pm (Yes %p and %P are backwards :)
%q      Quarter number, starting with 1
%r      time format: 09:05:57 PM
%R      time format: 21:05
%s      seconds since the Epoch, UCT
%S      seconds, leading 0's
%t      TAB
%T      time format: 21:05:57
%U      week number, Sunday as first day of week
%w      day of the week, numerically, Sunday == 0
%W      week number, Monday as first day of week
%x      date format: 11/19/94
%X      time format: 21:05:57
%y      year (2 digits)
%Y      year (4 digits)
%Z      timezone in ascii format (for example, PST), or in format -/+0000
%z      timezone in ascii format (for example, PST), or in format -/+0000  (Required element)
```

{{% alert title="Warning" color="warning" %}}

When using the `%z` and `%Z` format codes, consider that while `%z` strictly expects a specified timezone, and triggers a warning if the timezone is missing, `%Z` does not trigger a warning if the timezone is not specified.

For further information about the `%z` and `%Z` format codes, see the 'DESCRIPTION' section on the [srtptime(3) - NetBSD Manual Pages](https://man.netbsd.org/NetBSD-7.0/i386/strptime.3).

{{% /alert %}}

For example, for the date `01/Jan/2016:13:05:05 PST` use the following format string: `"%d/%b/%Y:%H:%M:%S %Z"`

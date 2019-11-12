This application will monitor route53 for new hosted zones (`example.com`).

It will match up the hostname to monitors from UptimeRobot. Any hostnames that are in Route53 but not being monitored will cause a Slack message to be posted.

## Why 

If you have a lot of domains being added, you might forget to add them to your monitoring service.

## Before you begin

You should have:
* a free Transposit account 
* a free UptimeRobot account 
* an AWS account
* a Slack workspace where you can install applications

## Setup

### AWS

Create an IAM user with `AmazonRoute53ReadOnlyAccess` permission. Save off the Access Key ID and Secret Access Key.

### UptimeRobot

Go to the settings page and get the Read-Only API Key. Save this for the authorization of the UptimeRobot data connector.

## Running it

* Fork the app [https://console.transposit.com/t/transposit-sample/route53_monitoring_check](https://console.transposit.com/t/transposit-sample/route53_monitoring_check) (find the Fork button at the top of the editor view).
* Navigate to **Code** and review the operations. You may want to look closely at the `run_it` operation and in particular the text in the `text` parameter. This is the message that will be sent when a hostname is not monitored.
* Navigate to **Deploy > Production Keys** and add keys for all the data connectors using the values you saved off during setup.
* Navigate to **Deploy > Environment Variables** and fill out the environment variable for which Slack channel you want to post warnings to.
* Navigate to **Deploy > Scheduled Tasks** and create a new scheduled task. Run the `run_it` operation once an hour: `37 19 * ? * *`

## Go further

* Make it work with cnames in your hosted zones. Hint, you'll have to use the `list_resource_record_sets` API call.
* Cache hostname values using the stash to [avoid throttling](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DNSLimitations.html#limits-api-requests) when querying Route53
* Ask the user if they'd like to add a monitor for each of the missing hostnames. Use the UptimeRobot API to do so.
* Text the user using [the Twilio API](https://www.transposit.com/docs/references/connectors/twilio-documentation/)--missing monitors are important!

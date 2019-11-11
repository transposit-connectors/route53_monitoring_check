(params) => {
  const unmonitored_hosts = api.run("this.unmonitored_hosts");
  unmonitored_hosts.forEach(host => {
    api.run("this.post_chat_message",{text: "Warning: "+ host +" has been added to Route53 but is not monitored in UptimeRobot."})
  })
}

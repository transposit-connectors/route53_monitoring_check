(params) => {

  const hostnames = api.run("this.list_hosted_zones").map(h => {
    return h.Name.replace(/\.$/,"");
  });
  const uniq_hostnames = [...new Set(hostnames)];
  
  const monitors = api.run("this.get_monitors")[0].monitor.map(m => {
    return m.url.replace("https://","").replace("http://","").replace("/","");
  });
  
  const uniq_monitored_hostnames = [...new Set(monitors)];
  const hostnames_missing_monitoring = uniq_hostnames.filter(x => !uniq_monitored_hostnames.includes(x) );
  return hostnames_missing_monitoring;
}


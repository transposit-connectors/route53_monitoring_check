(params) => {

  const hostnames = api.run("this.list_hosted_zones").map(h => {
    return h.Name.replace(/\.$/,"");
  });
  const monitors = api.run("this.get_monitors")[0].monitor.map(m => {
    return m.url;
  });
  console.log(monitors);
}


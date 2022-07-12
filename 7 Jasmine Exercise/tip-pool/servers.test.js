describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update serverTable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();
    let currServerTable = document.querySelectorAll('#serverTable td')
    expect(currServerTable[0].innerText).toEqual('Alice')
    expect(currServerTable[1].innerText).toEqual('$0.00')
    expect(currServerTable[2]).not.toBeDefined()
  });

  it('should not add a new server to allServers on submitServerInfo() when input is empty', function () {
    serverNameInput.value = '';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  });

  afterEach(function () {
    allServers = {}
    serverId = 0
    serverTbody.innerHTML = ''
  });
});

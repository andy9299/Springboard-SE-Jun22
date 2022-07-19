describe("Payment test (with setup and tear-down)", function () {
    beforeEach(function () {
        billAmtInput.value = "100";
        tipAmtInput.value = "10";
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + paymentId].billAmt).toEqual('100');
        expect(allPayments['payment' + paymentId].tipAmt).toEqual('10');
        expect(allPayments['payment' + paymentId].tipPercent).toEqual(10);
    });

    it('should not add a new payment to allPayments on submitPaymentInfo() when input is empty', function () {
        billAmtInput.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should create an object with payment details on createCurPayment()', function () {
        let expectedPayment = {
            billAmt: "100",
            tipAmt: "10",
            tipPercent: 10
        };
        expect(createCurPayment()).toEqual(expectedPayment);
    });

    it('should not create an object with empty inputs createCurPayment()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).not.toBeDefined();
    });

    it('should update paymentTable on appendPaymentTable()', function () {
        submitPaymentInfo();
        let currPaymentTable = document.querySelectorAll('#paymentTable td');
        expect(currPaymentTable.length).toEqual(3);
        expect(currPaymentTable[0].innerText).toEqual("$100");
        expect(currPaymentTable[1].innerText).toEqual("$10");
        expect(currPaymentTable[2].innerText).toEqual("10%");
        expect(currPaymentTable[3]).not.toBeDefined();
    });

    it('should update the summary on updateSummary()', function () {
        submitPaymentInfo();
        updateSummary();
        let currSummaryTable = document.querySelectorAll('#summaryTable td');
        expect(currSummaryTable[0].innerText).toEqual("$100");
        expect(currSummaryTable[1].innerText).toEqual("$10");
        expect(currSummaryTable[2].innerText).toEqual("10%");
    });

    afterEach(function () {
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});


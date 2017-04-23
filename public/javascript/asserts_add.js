$(function() {
	$('#form_submit').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		if ($('#assets_name').val() == "") {
			$('#assets_name').tips({
				msg: '请输入资产名字',
				side: 3,
				bg: '#AE81FF',
				time: 1,
			});
			$('#assets_name').focus();
			return false;
		}
		if ($('#assets_type').val() == "") {
			$('#assets_type').tips({
				msg: '请选择资产类型',
				side: 3,
				bg: '#AE81FF',
				time: 1,
			});
			$('#assets_type').focus();
			return false;
		}
		if ($('#assets_price').val() == "") {
			$('#assets_price').tips({
				msg: '请输入资产价格',
				side: 3,
				bg: '#AE81FF',
				time: 1,
			});
			$('#assets_price').focus();
			return false;
		}
		if (parseInt($('#assets_price').val()) == 0) {
			$('#assets_price').tips({
				msg: '买入需大于零',
				side: 3,
				bg: '#AE81FF',
				time: 1,
			});
			$('#assets_price').focus();
			return false;
		}
		if (!/^\d+(\.\d+)?$/.test($('#assets_price').val())) {
			$('#assets_price').tips({
				msg: '只能为大于零的数',
				side: 3,
				bg: '#AE81FF',
				time: 1,
			});
			$('#bond_purchase').focus();
			return false;
		}
		if ($('#assets_remark').val() == "") {
			$('#assets_remark').tips({
				msg: '请输入备注',
				side: 3,
				bg: '#AE81FF',
				time: 1,
			});
			$('#assets_remark').focus();
			return false;
		}

		$('#assets_form').submit();
	});
});
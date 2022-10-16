var ua = {};
ua.name = window.navigator.userAgent.toLowerCase();
ua.isiPhone = ua.name.indexOf("iphone") >= 0;
ua.isAndroid = ua.name.indexOf("android") >= 0;
ua.isMobile = ua.isiPhone || ua.isAndroid;
ua.isTouch = "ontouchstart" in window;
jQuery(function () {
	jQuery(window).on("load resize", function () {
		w = window.innerWidth ? window.innerWidth : jQuery(window).width();
		h = window.innerHeight ? window.innerHeight : jQuery(window).height();
	});
	if (ua.isTouch) {
		w = screen.width;
		h = screen.height;
	} else {
		w = window.innerWidth ? window.innerWidth : jQuery(window).width();
		h = window.innerHeight ? window.innerHeight : jQuery(window).height();
	}
	//=====tel iPhone androidのみ=====
	if (!ua.isMobile) {
		jQuery('a[href^="tel:"]').on("click", function (e) {
			e.preventDefault();
		});
	}
});
//=====header固定・スムーズスクロール=====
jQuery(function () {
	var header = jQuery("#head_wrap");
	var headerH = $(header).outerHeight(true);
	var mvH = $(".mv").outerHeight(true);

	jQuery(window).scroll(function () {
		if (jQuery(window).scrollTop() > mvH - 100) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	});

	jQuery('a[href^="#"]').click(function () {
		var speed = 1200;
		var href = jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? "html" : href);
		var position = target.offset().top - headerH;
		jQuery("body,html").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
});

//一文字づつ表示
jQuery(".js_movetext").each(function () {
	jQuery(this)
		.children()
		.addBack()
		.contents()
		.each(function () {
			if (this.nodeType == 3) {
				jQuery(this).replaceWith(jQuery(this).text().replace(/(\S)/g, "<span>$1</span>"));
			}
		});
	jQuery(this).on("inview", function () {
		jQuery(this).css({ opacity: 1 });
		for (var i = 0; i <= jQuery(this).children("span").length; i++) {
			jQuery(this)
				.children("span")
				.eq(i)
				.delay(100 * i)
				.animate({ opacity: 1 }, 100);
		}
	});
});

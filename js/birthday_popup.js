(function () {
  var OFFICIAL_MONTH_DAY = '06-12';
  var TEST_DATES = ['2026-06-01'];
  var STORAGE_PREFIX = 'birthday-bot-popup-dismissed-';

  function getSiteDate(date) {
    try {
      var formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      var parts = formatter.formatToParts(date).reduce(function (acc, item) {
        acc[item.type] = item.value;
        return acc;
      }, {});

      return {
        full: parts.year + '-' + parts.month + '-' + parts.day,
        monthDay: parts.month + '-' + parts.day
      };
    } catch (error) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');

      return {
        full: year + '-' + month + '-' + day,
        monthDay: month + '-' + day
      };
    }
  }

  function getDisplayState() {
    var params = new URLSearchParams(window.location.search);
    var forcePreview = params.get('birthdayPopup') === '1' || params.get('birthdayPopup') === 'true';
    var dateInfo = getSiteDate(new Date());
    var isActiveDate = dateInfo.monthDay === OFFICIAL_MONTH_DAY || TEST_DATES.indexOf(dateInfo.full) !== -1;

    return {
      forcePreview: forcePreview,
      show: forcePreview || isActiveDate,
      storageKey: STORAGE_PREFIX + dateInfo.full
    };
  }

  function hasDismissed(storageKey) {
    try {
      return window.localStorage && localStorage.getItem(storageKey) === '1';
    } catch (error) {
      return false;
    }
  }

  function markDismissed(storageKey) {
    try {
      if (window.localStorage) localStorage.setItem(storageKey, '1');
    } catch (error) {
      return;
    }
  }

  function buildPopup() {
    var popup = document.createElement('div');
    popup.id = 'birthday-bot-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('aria-labelledby', 'bbp-title');
    popup.setAttribute('aria-describedby', 'bbp-message bbp-wish');
    popup.hidden = true;
    popup.innerHTML =
      '<div class="bbp-backdrop" data-bbp-close></div>' +
      '<section class="bbp-panel" tabindex="-1">' +
        '<button class="bbp-close" type="button" aria-label="关闭弹窗" data-bbp-close>&times;</button>' +
        '<header class="bbp-header">' +
          '<div class="bbp-robot" aria-hidden="true">' +
            '<span class="bbp-eye bbp-eye-left"></span>' +
            '<span class="bbp-eye bbp-eye-right"></span>' +
            '<span class="bbp-mouth"></span>' +
          '</div>' +
          '<div>' +
            '<p class="bbp-kicker">System Blessing Online</p>' +
            '<h2 class="bbp-title" id="bbp-title">Robot助手小特：</h2>' +
          '</div>' +
        '</header>' +
        '<div class="bbp-body">' +
          '<p class="bbp-message" id="bbp-message">祝最帅最天才的站长大人生日快乐！</p>' +
          '<p class="bbp-wish" id="bbp-wish">愿你在二开头的年纪，继续大胆追梦，把热爱写进每一天。</p>' +
        '</div>' +
        '<div class="bbp-signal" aria-hidden="true">HAPPY&nbsp;LEVEL&nbsp;UP</div>' +
        '<p class="bbp-site">kadg735.cc</p>' +
        '<button class="bbp-confirm" type="button" data-bbp-close>收到祝福</button>' +
      '</section>';

    return popup;
  }

  function openPopup(popup) {
    popup.hidden = false;
    document.body.classList.add('birthday-popup-open');

    requestAnimationFrame(function () {
      popup.classList.add('bbp-visible');
      var panel = popup.querySelector('.bbp-panel');
      if (panel) panel.focus();
    });
  }

  function closePopup(popup, storageKey, forcePreview) {
    if (!forcePreview) markDismissed(storageKey);
    popup.classList.remove('bbp-visible');
    document.body.classList.remove('birthday-popup-open');

    window.setTimeout(function () {
      popup.hidden = true;
    }, 180);
  }

  function initBirthdayPopup() {
    var state = getDisplayState();
    if (!state.show) return;
    if (!state.forcePreview && hasDismissed(state.storageKey)) return;
    if (document.getElementById('birthday-bot-popup')) return;

    var popup = buildPopup();
    document.body.appendChild(popup);

    popup.addEventListener('click', function (event) {
      if (event.target.closest('[data-bbp-close]')) {
        closePopup(popup, state.storageKey, state.forcePreview);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && popup.classList.contains('bbp-visible')) {
        closePopup(popup, state.storageKey, state.forcePreview);
      }
    });

    window.setTimeout(function () {
      openPopup(popup);
    }, 520);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBirthdayPopup);
  } else {
    initBirthdayPopup();
  }
})();

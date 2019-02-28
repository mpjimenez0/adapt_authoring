// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define([
  'backbone',
  'core/origin',
  'core/helpers'
], function(Backbone, Origin, Helpers) {
  var UserProfileModel = Backbone.Model.extend({

    idAttribute: '_id',
    url: '/api/user/me',

    validate: function (attributes, options) {
      var validationErrors = {};

      if (!attributes.firstName) {
        validationErrors.firstName = Origin.l10n.t('app.validationrequired');
      }

      if (!attributes.lastName) {
        validationErrors.lastName = Origin.l10n.t('app.validationrequired');
      }

      if (!attributes.email) {
        validationErrors.email = Origin.l10n.t('app.validationrequired');
      } else if (!Helpers.isValidEmail(attributes.email)) {
        validationErrors.email = Origin.l10n.t('app.invalidusernameoremail');
      }

      if (attributes._isNewPassword) {
        if (!attributes.password) {
          validationErrors.password = Origin.l10n.t('app.validationrequired');
        } else {
          var errors = Helpers.validatePassword(attributes.password, attributes.email, attributes.firstName, attributes.lastName);
          if (errors.length) {
            validationErrors.password = errors.join('<br>');
          }
        }
      }

      return _.isEmpty(validationErrors) ? null : validationErrors;
    }

  });

  return UserProfileModel;

});

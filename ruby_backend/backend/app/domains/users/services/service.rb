module Users
  module Services
    class Service
      def self.get_users
        User.all
      end

      def self.get_user(id)
        User.find(id)
      end

      def self.create_user(params)
        User.create(params)
      end

      def self.update_user(id, params)
        User.find(id).update(params)
      end

      def self.delete_user(id)
        User.find(id).destroy
      end
    end
  end
end
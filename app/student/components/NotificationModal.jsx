import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const NotificationModal = () => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const viewInbox = () => {
    router.push(`/student/inbox/${params.id}`)
  }

  return (
    <>
      {/* Notification Icon */}
      <div onClick={toggleModal} className="relative mr-4 cursor-pointer">
        {/* Badge */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-xs text-white">
          5
        </span>
        <Image
          src="/assets/notifications-bell.png"
          alt="Notifications"
          className="w-[48px] h-[48px]"
          width={48}
          height={48}
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="absolute top-14 right-4 bg-white w-100 max-w-md rounded-lg shadow-lg p-4 z-50">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-red-600">Notifications</h2>
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          {/* Notification Items */}
          <div className="mt-4 max-h-60 overflow-y-auto space-y-4">
            {/* Example Notification */}
            <div className="flex items-start space-x-4">
              <img
                src="/assets/images/user.png"
                alt="Dr. Ajibade Solomon"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="font-bold">Mr Jimoh</span> made an
                  announcement: <span>CYS 421 Quiz...</span>
                </p>
                <p className="text-xs text-gray-500">30 mins ago</p>
              </div>
            </div>
            <hr />
            <div className="flex items-start space-x-4">
              <img
                src="/assets/images/user.png"
                alt="Dr. Ajibade Solomon"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="font-bold">Mr Lawal</span> made an
                  announcement: <span>Assignment has been...</span>
                </p>
                <p className="text-xs text-gray-500">30 mins ago</p>
              </div>
            </div>
            <hr />
            <div className="flex items-start space-x-4">
              <img
                src="/assets/images/user.png"
                alt="Dr. Ajibade Solomon"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="font-bold">Mr Jimoh</span> made an
                  announcement: <span>the previous quiz lecture has been updated...</span>
                </p>
                <p className="text-xs text-gray-500">30 mins ago</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
              Mark all as read
            </button>
            <button onClick={viewInbox} className="px-4 py-2 border border-red-600 text-red-600 text-sm rounded-md hover:bg-red-100">
              See all
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Core.Common
{
    public class ServerResponse
    {
        private readonly bool _isSuccess;
        private readonly string _error;

        public bool IsSuccess { get { return _isSuccess; } }
        public string Error { get { return _error; } }

        protected ServerResponse(bool isSuccess, string error)
        {
            _isSuccess = isSuccess;
            _error = error;
        }

        public static ServerResponse Fail(string message)
        {
            return new ServerResponse(false, message);
        }

        public static ServerResponse<T> Ok<T>(T data)
        {
            return new ServerResponse<T>(data, true, string.Empty);
        }
       
    }

    public class ServerResponse<T> : ServerResponse
    {
        private readonly T _data;

        public T Data { get { return _data; } }

        protected internal ServerResponse(T data, bool isSuccess, string error)
            : base(isSuccess, error)
        {
            _data = data;
        }
      
    }
}
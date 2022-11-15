package seb.project.Codetech.global.page;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PageInfo {

	@AllArgsConstructor
	@Getter
	public static class Request
	{
		private int page;
		private int size;

		public Request() {
			this.page = 0;
			this.size = 5;
		}
	}

	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	public static class Response {

		private int page;
		private int size;
		private long totalElements;
		private int totalPages;
	}
}

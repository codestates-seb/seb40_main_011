package seb.project.Codetech.global.page;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PageListDto<T> {
	private List<T> data;
	private PageInfo.Response pageInfo;

	public PageListDto(List<T> data, Page page) {
		this.data = data;
		this.pageInfo = new PageInfo.Response(page.getNumber() + 1,
			page.getSize(), page.getTotalElements(), page.getTotalPages());
	}
}

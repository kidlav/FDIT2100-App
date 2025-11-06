import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tag from '@/components/ui/posts/Tag';

const tagText = 'crime';

describe('Tag Component', () => {
  it('renders the tag with the correct text', () => {
    const view = render(<Tag tag={tagText} />);
    expect(view).not.toBeNull();

    const span = screen.findByText(tagText);
    expect(span).not.toBeNull();
  });
});